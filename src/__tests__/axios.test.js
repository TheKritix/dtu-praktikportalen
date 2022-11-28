import { expect } from "@jest/globals";

import "../../enzymConfig";
import axios from "axios";

import authService from "../services/auth-service";
import postService from "../services/post-service";

const API_URL = process.env.REACT_APP_API;

//Source: https://www.naftalimurgor.com/introduction-to-mocking-axios/
jest.mock("axios");

describe("employer login", () => {
  it("should return user", async () => {
    const user = {
      username: "Test",
      password: "TestTest",
    };
    const response = {
      data: {
        username: "Test",
      },
    };
    axios.post.mockResolvedValue(response);
    const result = await authService.employerLogin(user);
    expect(result.username).toEqual(response.data.username);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});

describe("posts api", () => {
  it("should return posts", async () => {
    const mockFakePosts = {
      data: [
        {
          id: 1,
          title: "Test",
          type: "Test",
          company: "Test",
          location: "Test",
          startdate: "Test",
          description: "Test",
          contact: "Test",
          applyToEmail: "Test",
          website: "Test",
          bannerImg: "Test",
        },
      ],
    };
    const response = {
      data: mockFakePosts,
    };
    axios.get.mockResolvedValue(response);
    const result = await axios.get(API_URL + "post");
    expect(result).toEqual(response);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
