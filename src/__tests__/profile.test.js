import { render, screen } from '@testing-library/react'
import {jest} from '@jest/globals';
import Password from "../components/profile/profileComponents/passwordSettings"

jest.useFakeTimers();

// const Profile = require("../components/profile/profile");
// const ProfileSettings = require("../components/profile/profileComponents/profileSettings");
// const Email = require("../components/profile/profileComponents/emailSettings");

// const ProfileStore = require("../stores/profileStore");

test('render profile', () => {
    render(<Password />)
})

