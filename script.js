const API_URL = "https://randomuser.me/api/?results=6";
let userList = [];

const slider = document.getElementById("mySlider");
const label = document.getElementById("label");
const contact = document.getElementById("contact");

slider.addEventListener("change", (e) => {
  const { value } = e.target;

  // console.log(value);

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

contact.addEventListener("click", () => {
  // document.querySelector(".phone").style.height = "0px";
  // document.querySelector(".phone").style.maxHeight = "calc(100vh - 100px)";

  displayContactList();
});

// display contact list screen
const displayContactList = () => {
  // hide app screen
  document.querySelector(".app-screen").remove();

  // display contact list
  document.querySelector(".contact-list").style.display = "block";
};

const apiCall = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    userList = data.results;
    // return userList;
  } catch (error) {
    console.log(error);
  }

  // Hide spinner
  document.querySelector(".spinner").style.display = "none";

  // display accordion
  accordionFunc(userList);
};

apiCall(API_URL);

const accordionFunc = (userList) => {
  // console.log(userList.length);
  document.getElementById("user-count").innerText =
    userList.length + "  Contacts Found";
  let str = "";
  // console.log(userList);
  userList.map((item, i) => {
    str += `
    <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed d-flex"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${i}"
                    aria-expanded="false"
                    aria-controls="collapse${i}"
                  >
                    <img
                      class="rounded-pill"
                      src=${item.picture.thumbnail}
                      alt=""
                    />
                    <div class="ms-2">
                      <div class="fw-bolder">${
                        item.name.title +
                        ". " +
                        item.name.first +
                        " " +
                        item.name.last
                      }</div>
                      <small class="">${
                        item.location.city + "," + item.location.country
                      }</small>
                    </div>
                  </button>
                </h2>

                <div
                  id="collapse${i}"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="d-flex align-items-center flex-column">
                      <img
                        class="rounded-pill"
                        src=${item.picture.thumbnail}
                        alt=""
                        width="150px"
                      />
                      <div class="fw-bolder d-flex flex-column mt-2">
                        <div>
                          <i
                            class="bi bi-person-lines-fill font-bolder me-2"
                          ></i>
                          ${
                            item.name.title +
                            ". " +
                            item.name.first +
                            " " +
                            item.name.last
                          }
                        </div>
                        <div>
                          <a href="tel:${item.cell}"
                            ><i class="bi bi-phone me-2"></i> ${item.cell}</a
                          >
                        </div>
                        <div>
                          <a href="${item.email}"
                            ><i class="bi bi-envelope me-2"></i
                            >${item.email}</a
                          >
                        </div>
                        <div>
                          <a
                            href="https://www.google.com/maps/place/${
                              item.location.street.number
                            }+${item.location.street.name},+${
      item.location.city
    }+${item.location.state}"
                            target="_blank"
                            ><i class="bi bi-geo-alt-fill me-2"></i> ${
                              item.location.country
                            }</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });

  document.getElementById("accordionUser").innerHTML = str;
};

// search function

document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;

  const filterArr = userList.filter((item) => {
    const name = (item.name.first + " " + item.name.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });
  accordionFunc(filterArr);
});
