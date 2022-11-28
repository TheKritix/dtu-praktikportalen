import { flow, makeAutoObservable, runInAction } from "mobx";
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
    this.fetchUserInformation();
  }

  fetchUserInformation = flow(function* () {
    if (!this.user) {
      yield runInAction(() => {
        this.user = authService.getCurrentUser();
      });
    }
  });

  pdfLoadProgress = false;

  async fetchPDFName() {
    if (this.user && !this.pdf && !this.pdfLoadProgress) {
      this.pdfLoadProgress = true;
      await studentService.getStudentPDFName(this.user).then((response) => {
        this.pdf = response;
        this.pdfLoadProgress = false;
      });
    }
  }

  //Used for updating the PDF name on the page after the user has saved a new PDF.
  async updatePDFName() {
    if (this.user && this.pdf) {
      await studentService.getStudentPDFName(this.user).then((response) => {
        this.pdf = response;
      });
    }
  }

  async uploadBackdropImage(file) {
    if (this.user) {
      if (this.user.companyName) {
        await employerService.updateBackdropImage(this.user, file);
      } else if (this.user.studentID) {
        await studentService.updateBackdropImage(this.user, file);
      }
    }
  }

  async uploadProfileImage(file) {
    if (this.user) {
      if (this.user.companyName) {
        await employerService.updateProfileImage(this.user, file);
      } else if (this.user.studentID) {
        await studentService.updateProfileImage(this.user, file);
      }
    }
  }

  backdropLoadInProgress = false;

  async fetchBackdropImage() {
    if (
      this.user.backdropImageID &&
      !this.backdropImage &&
      !this.backdropLoadInProgress
    ) {
      this.backdropLoadInProgress = true;
      if (this.user.companyName && this.backdropLoadInProgress) {
        await employerService.getBackdropImage(this.user).then((response) => {
          this.backdropImage = URL.createObjectURL(new Blob([response.data]));
          this.backdropLoadInProgress = false;
        });
      } else if (this.user.studentID && this.backdropLoadInProgress) {
        await studentService.getBackdropImage(this.user).then((response) => {
          this.backdropImage = URL.createObjectURL(new Blob([response.data]));
          this.backdropLoadInProgress = false;
        });
      }
    }
  }

  profileLoadInProgress = false;

  async fetchProfileImage() {
    if (
      this.user.profileImageID &&
      !this.profileImage &&
      !this.profileLoadInProgress
    ) {
      this.profileLoadInProgress = true;
      if (this.user.companyName && this.profileLoadInProgress) {
        await employerService.getProfileImage(this.user).then((response) => {
          this.profileImage = URL.createObjectURL(new Blob([response.data]));
          this.profileLoadInProgress = false;
        });
      } else if (this.user.studentID && this.profileLoadInProgress) {
        await studentService.getProfileImage(this.user).then((response) => {
          this.profileImage = URL.createObjectURL(new Blob([response.data]));
          this.profileLoadInProgress = false;
        });
      }
    }
  }

  async updateUserData() {
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
      if (this.user.companyName) {
        await employerService.updateEmployerEmail(this.user);
      } else if (this.user.studentID) {
        await studentService.updateStudentEmail(this.user);
      }
    }
  }

  async updateEmployerPassword() {
    if (this.user) {
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
