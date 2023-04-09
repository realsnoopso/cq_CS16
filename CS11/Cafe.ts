export const cafe = {
  isOpen: false,
  open: function () {
    this.isOpen = true;
  },
  close: function () {
    this.isOpen = false;
  },
};

export default cafe;
