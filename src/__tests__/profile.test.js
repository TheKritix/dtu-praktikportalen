import renderer from 'react-test-renderer';

import Password from "../components/profile/profileComponents/passwordSettings"

// const Profile = require("../components/profile/profile");
// const ProfileSettings = require("../components/profile/profileComponents/profileSettings");
// const Email = require("../components/profile/profileComponents/emailSettings");

// const ProfileStore = require("../stores/profileStore");

it('render profile', () => {
    const component = renderer.create(<Password />)
})