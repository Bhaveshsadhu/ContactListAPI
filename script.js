const slider = document.getElementById("mySlider");
const label = document.getElementById("label");

slider.addEventListener("change", (e) => {
  const { value } = e.target;

  console.log(value);

  if (value > 70) {
    label.textContent = "";
    disAppScreen();
  } else {
    label.textContent = "Slide to Unlock";
  }
});

const disAppScreen = () => {
  // hide the home screen
  document.querySelector(".home-screen").remove();

  //   show the app screen
  document.querySelector(".app-screen").style.display = "block";
};
