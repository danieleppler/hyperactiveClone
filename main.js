window.addEventListener("load", () => {
  const careers_wrapper = document.getElementById("careers-wrapper");
  const careers_nav_item_menu = document.getElementById(
    "careers-nav-item-menu"
  );
  careers_nav_item_menu.hidden = true;
  careers_wrapper.addEventListener("mouseover", () => {
    careers_nav_item_menu.hidden = false;
  });
  careers_wrapper.addEventListener("mouseleave", () => {
    careers_nav_item_menu.hidden = true;
  });
});
