import { shallowMount } from "@vue/test-utils";
import Layout from "@/components/dashboard/Layout.vue";

describe("Layout", () => {
  it("renders drawer when passed", () => {
    // const msg = "new message";
    const wrapper = shallowMount(Layout, {
      data() {
        return {
          drawer: true
        }
      }
    });
    expect(wrapper.find('drawer').setValue).toMatch('true');
  });
});
