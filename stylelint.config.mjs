import propertyGroups from "stylelint-config-recess-order/groups"

/** @type {import("stylelint").Config} */
export default {
  plugins: ["stylelint-order"],
  rules: {
    "order/properties-order": propertyGroups.map((group) => ({
      ...group,
      emptyLineBefore: "always",
      noEmptyLineBetween: true,
    })),
  },
}
