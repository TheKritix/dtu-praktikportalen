import { render } from "@testing-library/react";
import { mount, shallow } from "enzyme";

import { profileStore } from "../stores/profileStore";
import Password from "../components/profile/profileComponents/passwordSettings";
import Email from "../components/profile/profileComponents/emailSettings";
import ProfileSettings from "../components/profile/profileComponents/profileSettings";
import EmployerSettings from "../components/profile/profileComponents/settings/employerSettings";
import StudentSettings from "../components/profile/profileComponents/settings/studentSettings";
import Profile from "../components/profile/profile";

import "../../enzymConfig";

//Source: https://github.com/axios/axios/issues/5101
//Source: https://jestjs.io/docs/tutorial-react
//Source: https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/

const mockUser = {
  id: "63738f408a4b2c4c8d6e1aa0",
  username: "Test",
  email: "test@test.dk",
  name: "Test",
  companyName: "Test",
  backdropImageID: "6374a643d6eec1ef952bde43",
  profileImageID: "637773b9fa2171f398fc4525",
};

const setLocalStorage = () => {
  window.localStorage.setItem("user", JSON.stringify(mockUser));
};

test("localstorage test", () => {
  setLocalStorage();
  expect(localStorage.getItem("user")).toEqual(JSON.stringify(mockUser));
});

test("render password", () => {
  render(<Password />);
});

test("render email", () => {
  setLocalStorage();
  profileStore.fetchUserInformation().then(() => {
    render(<Email />);
  });
});

// Resultere i en underlig Jest Axios fejl men kun ved en test på Github Actions - Skal undersøges
test("render profileSettings", () => {
  setLocalStorage();
  profileStore.fetchUserInformation().then(() => {
    render(<ProfileSettings />);
  });
});

test("render studentSettings", () => {
  setLocalStorage();
  profileStore.fetchUserInformation().then(() => {
    render(<StudentSettings />);
  });
});

test("render employerSettings", () => {
  setLocalStorage();
  profileStore.fetchUserInformation().then(() => {
    render(<EmployerSettings />);
  });
});

test("render profile", () => {
    setLocalStorage();
    profileStore.fetchUserInformation().then(() => {
      render(<Profile />);
    });
});

