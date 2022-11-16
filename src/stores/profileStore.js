import { makeAutoObservable } from "mobx";
import authService from "../services/auth-service";
import studentService from "../services/student-service";
import employerService from "../services/employer-service";

class ProfileStore {
  user;
  pdf;

  backdropImage;
  profileImage;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUserInformation() {
    if (!this.user) {
      console.log("---> Fetched user information");
      this.user = authService.getCurrentUser();
    }
  }

  async fetchPDFName() {
    if (this.user && !this.pdf) {
      console.log("---> Fetched PDF name");
      await studentService.getStudentPDFName(this.user).then((response) => {
        this.pdf = response;
      });
    }
  }

  //Used for updating the PDF name on the page after the user has saved a new PDF.
  async updatePDFName() {
    if (this.user && this.pdf) {
      console.log("---> Updated PDF name");
      await studentService.getStudentPDFName(this.user).then((response) => {
        this.pdf = response;
      });
    }
  }

  async uploadBackdropImage(file) {
    if (this.user) {
      console.log("---> Uploading backdrop image");
      if (this.user.companyName) {
        await employerService.updateBackdropImage(this.user, file);
      } else if (this.user.studentID) {
        await studentService.updateBackdropImage(this.user, file);
      }
    }
  }

  async uploadProfileImage(file) {
    if (this.user) {
      console.log("---> Uploading backdrop image");
      if (this.user.companyName) {
        await employerService.updateProfileImage(this.user, file);
      } else if (this.user.studentID) {
        await studentService.updateProfileImage(this.user, file);
      }
    }
  }

  async fetchBackdropImage() {
    if (this.user && !this.backdropImage) {
      console.log("---> Fetching backdrop image");
      if (this.user.companyName) {
        await employerService.getBackdropImage(this.user).then((response) => {
          this.backdropImage = URL.createObjectURL(new Blob([response.data]));
        });
      } else if (this.user.studentID) {
        await studentService.getBackdropImage(this.user).then((response) => {
          this.backdropImage = URL.createObjectURL(new Blob([response.data]));
        });
      }
    }
  }

  async fetchProfileImage() {
    if (this.user && !this.profileImage) {
      console.log("---> Fetching profile image");
      if (this.user.companyName) {
        await employerService.getProfileImage(this.user).then((response) => {
          this.profileImage = URL.createObjectURL(new Blob([response.data]));
        });
      } else if (this.user.studentID) {
        await studentService.getProfileImage(this.user).then((response) => {
          this.profileImage = URL.createObjectURL(new Blob([response.data]));
        });
      }
    }
  }

  async updateUserData() {
    console.log("----> Update User Data");
    if (this.user && this.user.companyName) {
      await employerService.getEmployer(this.user).then(() => {
        this.user = authService.getCurrentUser();
      });
    } else if (this.user && this.user.studentID) {
      await studentService.getStudent(this.user).then(() => {
        this.user = authService.getCurrentUser();
      });
    }
  }

  async updateEmail() {
    if (this.user) {
      console.log("---> Updating user email");
      if (this.user.companyName) {
        await employerService.updateEmployerEmail(this.user);
      } else if (this.user.studentID) {
        await studentService.updateStudentEmail(this.user);
      }
    }
  }

  async updateEmployerPassword() {
    if (this.user) {
      console.log("---> Updating user password");
      if (this.user.companyName) {
        await employerService.updateEmployerPassword(this.user);
      }
    }
  }

  get User() {
    return this.user;
  }

  get PDFName() {
    return this.pdf;
  }

  get BackdropImage() {
    return this.backdropImage;
  }

  get ProfileImage() {
    return this.profileImage;
  }
}

export const profileStore = new ProfileStore();
