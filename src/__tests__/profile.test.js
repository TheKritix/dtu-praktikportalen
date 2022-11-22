import { render, screen } from "@testing-library/react";
import { mount } from "enzyme";

import { profileStore } from "../stores/profileStore";
import Password from "../components/profile/profileComponents/passwordSettings";
import Email from "../components/profile/profileComponents/emailSettings";

import "../../enzymConfig";

import App from "../App";

//Source: https://github.com/axios/axios/issues/5101
//Source: https://jestjs.io/docs/tutorial-react
//Source: https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/

const user = {
  id: "63738f408a4b2c4c8d6e1aa0",
  username: "Test",
  email: "test@test.dk",
  name: "Test",
  companyName: "Test",
  backdropImageID: "6374a643d6eec1ef952bde43",
  profileImageID: "637773b9fa2171f398fc4525",
};

const setLocalStorage = () => {
  window.localStorage.setItem("user", JSON.stringify(user));
};

test("render password", () => {
  render(<Password />);
});

test("localstorage test", () => {
  setLocalStorage();
  expect(localStorage.getItem("user")).toEqual(JSON.stringify(user));
});

test("render email", () => {
  setLocalStorage();
  profileStore.fetchUserInformation().then(() => {
    render(<Email />);
  });
});
