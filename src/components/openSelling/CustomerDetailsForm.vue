<template>
  <div class="customer-form">
    <div class="customer-form__content">
      <h3 class="mb-5 text-center">Enter the following details</h3>
      <!-- description -->
      <p class="text-center secondary--text">
        Please provide the following product details
      </p>

      <v-form class="customer-form__content__form" ref="form">
        <h4 class="mb-3">Customer details</h4>

        <!-- name field -->
        <div class="input-field">
          <label class="mb-1">Customer name*</label>
          <v-text-field
            outlined
            dense
            color="primary"
            placeholder="Customer's full name"
            v-model="customerName"
            :rules="nameRules"
            required
          >
          </v-text-field>
        </div>
        <!-- email field -->
        <div class="input-field">
          <label class="mb-1"
            >Customer email <span class="primary--text">(Optional)</span></label
          >
          <v-text-field
            outlined
            dense
            color="primary"
            placeholder="Customer's email address"
            v-model="customerEmail"
            :rules="emailRules"
            required
          >
          </v-text-field>
        </div>
        <!-- phone number field -->
        <div class="input-field phone-field">
          <label class="mb-1">
            Customer phone Number*
            <!-- <span class="primary--text"
              >(Ensure that this phone number is reachable at all times)</span
            > -->
          </label>
          <span class="primary--text phone-format">+234</span>
          <v-text-field
            outlined
            dense
            color="primary"
            placeholder="Customer's mobile phone number"
            v-model="customerPhoneNumber"
            :rules="phoneNumberRules"
            type="number"
            required
          >
          </v-text-field>
        </div>
        <!-- delivery address -->
        <div class="input-field">
          <label class="mb-1">
            Delivery Address*
            <span class="primary--text"
              >(Delivery locations are Lagos, Abuja, Rivers, Oyo, Ondo, Ogun and
              Kwara only)</span
            >
          </label>
          <v-text-field
            outlined
            dense
            color="primary"
            placeholder="Street address"
            v-model="customerAddress"
            :rules="deliveryAddressRules"
            ref="deliveryAddress"
            id="deliveryAddress"
            required
          >
          </v-text-field>
        </div>

        <h4 class="mb-3 mt-4">Pickup details</h4>
        <!-- phone number field -->
        <div class="input-field phone-field">
          <label class="text-field mb-1">
            Pickup Phone Number
            <!-- <span class="primary--text"
              >(Ensure that this phone number is reachable at all times)</span
            > -->
          </label>
          <span class="primary--text phone-format">+234</span>
          <v-text-field
            color="primary"
            dense
            outlined
            placeholder="e.g. 813471****"
            v-model="pickUpNumber"
            :rules="phoneNumberRules"
            type="number"
            required
          >
          </v-text-field>
        </div>
        <!-- transport field -->
        <div class="input-field">
          <label class="mb-1">Transport Method</label>
          <v-select
            dense
            :items="carriage"
            item-text="text"
            label="Select Carriage"
            outlined
            class="pa-0"
            :rules="nameRules"
            @change="selectCarriage"
          >
            <template v-slot:selection="{ item }">
              <span class="mr-4">{{ item.text }}</span>
              <v-icon>{{ item.icon }}</v-icon>
            </template>

            <template v-slot:item="{ item }">
              <span class="mr-4">{{ item.text }}</span>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
          </v-select>
        </div>
        <!-- pickup Address field -->
        <div class="input-field">
          <label class="mb-1">
            Pickup Address
            <span class="primary--text"
              >(Pick up locations are Lagos, Abuja, Rivers, Oyo, Ondo, Ogun and
              kwara only)</span
            >
          </label>
          <v-text-field
            outlined
            dense
            type="text"
            color="primary"
            placeholder="1 Isaac John St 1 Isaac John St, Ikeja GRA 101233, Lagos, Nigeria"
            v-model="pickupAddress"
            :rules="pickupAddressRules"
            id="pickupAddress"
            required
          >
          </v-text-field>
        </div>
        <!-- btn section -->
        <div class="mt-3" style="width: 100%">
          <!-- continue to checkout btn -->
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            width="150px"
            @click="validateForm()"
            >Sell now</v-btn
          >
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
import { searchKeyInObject, search } from "@/helpers/general.js";
export default {
  name: "CustomerDetailsForm",
  props: ["loading"],
  data: function () {
    return {
      carriage: [
        { icon: "mdi-bicycle-basket", text: "BIKE" },
        { icon: "mdi-car", text: "CAR" },
        { icon: "mdi-truck", text: "TRUCK" },
      ],
      customerName: "",
      customerPhoneNumber: "",
      customerEmail: "",
      customerAddress: "",
      selectedTransportMethod: "",
      pickupAddress: "",
      pickUpNumber: "",
      deliveryLat: "",
      deliveryLng: "",
      pickupLat: "",
      pickupLng: "",
      validDeliveryAddress: false,
      validPickupAddress: false,
      deliveryState: null,
      pickupState: null,
      allowedLocation: {
        LAGOS: "Lagos",
        ABUJA: "Federal Capital Territory",
        //RIVERS: "Rivers",
        //OYO: "Oyo",
        //KWARA: "Kwara",
        //OGUN: "Ogun State",
        //ONDO: "Ondo",
      },
      deliveryAddressAutocomplete: "",
      pickupAutocomplete: "",
      nameRules: [
        (v) => !!v || "this field is required", // verifies name satisfies the requirement
      ],
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => v.length == 0 || /.+@.+\..+/.test(v) || "Invalid email",
      ],
      phoneNumberRules: [
        //verifies phone number satisfies the requirement
        (v) => !!v || "This field is required",
        (v) => v.substring(0, 1) != 0 || "Phone number cannot begin with 0",
        (v) => v.length > 9 || "Number should be 10 digits or more",
        (v) => v.length < 11 || "Maximum 11 digits or more",
      ],
      deliveryAddressRules: [
        //verifies phone number satisfies the requirement
        (v) => !!v || "Address is required",
        () =>
          this.validDeliveryAddress ||
          "please select a valid delivery location",
      ],
      pickupAddressRules: [
        //verifies phone number satisfies the requirement
        (v) => !!v || "Address is required",
        () =>
          this.validPickupAddress || "please select a valid pick up location",
      ],
    };
  },
  mounted() {
    let region = {
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(6.5244, 3.3792)
      ),
      componentRestrictions: { country: ["NG"] },
      fields: ["geometry", "name", "formatted_address", "address_components"],
    };
    this.deliveryAddressAutocomplete =
      new window.google.maps.places.Autocomplete(
        document.getElementById("deliveryAddress"),
        region
      );
    this.pickupAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("pickupAddress"),
      region
    );
    this.deliveryAddressAutocomplete.addListener("place_changed", () => {
      this.onPlaceChanged("delivery");
    });
    this.pickupAutocomplete.addListener("place_changed", () => {
      this.onPlaceChanged("pickup");
    });
  },
  methods: {
    // update address and validate
    onPlaceChanged(addressType) {
      let place =
        addressType === "delivery"
          ? this.deliveryAddressAutocomplete.getPlace()
          : this.pickupAutocomplete.getPlace();
      if (!place.geometry) {
        if (addressType === "delivery") {
          this.validDeliveryAddress = false;
        } else {
          this.validPickupAddress = false;
        }
      } else {
        if (addressType === "delivery") {
          this.customerAddress = place.name + " " + place.formatted_address;
          this.deliveryLat = place.geometry.location.lat();
          this.deliveryLng = place.geometry.location.lng();
          this.deliveryState = search(
            "administrative_area_level_1",
            place.address_components
          ).long_name;
          let locationDetails = searchKeyInObject(
            this.deliveryState,
            this.allowedLocation
          );
          this.validDeliveryAddress = locationDetails.status;
          this.deliveryState = locationDetails.key;
        } else {
          this.pickupAddress = place.name + " " + place.formatted_address;
          this.pickupLat = place.geometry.location.lat();
          this.pickupLng = place.geometry.location.lng();
          this.pickupState = search(
            "administrative_area_level_1",
            place.address_components
          ).long_name;
          let locationDetails = searchKeyInObject(
            this.pickupState,
            this.allowedLocation
          );
          this.validPickupAddress = locationDetails.status;
          this.pickupState = locationDetails.key;
        }
      }
    },
    // set transport method
    selectCarriage(params) {
      this.selectedTransportMethod = params;
    },
    validateForm() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.emitCustomerDetails();
      }
    },
    emitCustomerDetails() {
      const customerDetails = {
        customer_name: this.customerName,
        customer_email: this.customerEmail,
        customer_phone: "+234" + this.customerPhoneNumber,
        delivery_location: {
          address: this.customerAddress,
          state: this.deliveryState,
          lng: this.deliveryLng,
          lat: this.deliveryLat
        },
        pickup_location: {
          address: this.pickupAddress,
          state: this.pickupState,
          lng: this.pickupLng,
          lat: this.pickupLat,
        },
        payment_link: `${process.env.VUE_APP_SELLER_BASE_URL}/open-selling-checkout-details`,
        vehicle_type: this.selectedTransportMethod,
        pickup_phone: "+234" + this.pickUpNumber,
        pickup_name: this.$store.getters["settings/getUserProfile"].name
      };
      this.$emit("customerDetails", customerDetails);
    },
  },
};
</script>
<style lang="scss" scoped>
.customer-form {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .back-btn {
      position: absolute;
      left: 0px;
      top: 0;
      cursor: pointer;
      text-decoration: none;
    }
  }
  &__content {
    max-width: 950px;
    margin: auto;
    padding: 20px 0;
    &__form {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 30px;
      align-items: end;
      h4 {
        width: 100%;
      }
      .input-field {
        width: 48%;
        position: relative;
        @media (max-width: 650px) {
          width: 100%;
        }
      }
      label {
        font-size: 14px;
      }
    }
  }
}
.phone-format {
  position: absolute;
  bottom: 34px;
  left: 12px;
}
</style>