import { test } from '../../_fixtures/fixtures';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';

let newPassword;

test.beforeEach(async ({ factories }) => {
  newPassword = factories.user.generatePassword();
});

test('Login with old password after it was updated from settings', async ({
  loggedInUserAndPage,
}) => {
  const { page, registeredUser } = loggedInUserAndPage;
  const editSettingsPage = new EditProfileSettingsPage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);
  const signInPage = new SignInPage(page);

  await editSettingsPage.open();
  await editSettingsPage.fillNewPasswordField(newPassword);
  await editSettingsPage.clickUpdateSettingsButton();
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(registeredUser.email);
  await signInPage.fillPasswordField(registeredUser.password);
  await signInPage.clickSignInButton();
  await signInPage.assertErrorMessageContainsText(
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );
});
