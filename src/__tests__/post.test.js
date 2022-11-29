import { render } from "@testing-library/react";
import { mount, shallow } from "enzyme";

import InputForm  from "../components/create-post/inputForm.jsx"
import PostPage from "../pages/postPage.jsx"
import PostContent from "../components/post-page/postContent";
import PostContactInfo from "../components/post-page/postContactInfo";

//Source: https://jestjs.io/docs/tutorial-react

const mockPost = {
    id: "6385d5841c195027d4363966",
    title: "Test",
    type: "praktik",
    company: "Test",
    location: "Test",
    startdate: "Test",
    description: "Test",
    contact: "Test",
    applyToEmail: "Test@Test",
    website: "Test",
    bannerImageId: "6385d5841c195027d4363968",
};

test("inputform test", () => {
    render(<InputForm/>);
})

test("postpage", () => {
    render(<PostPage/>);
})

test("postContent", () => {
    render(<PostContent post={mockPost}/>);
})

test("postContactInfo", () => {
    render(<PostContactInfo post={mockPost}/>);
})