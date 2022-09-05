import { Router, Route, Private, Set } from '@redwoodjs/router'

import AdminLayout from './layouts/AdminLayout/AdminLayout'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="login" roles={['admin']}>
        <Set wrap={AdminLayout}>
          <Route path="/admin" page={AdminPage} name="admin" />
          <Route path="/admin/users/new" page={AdminUserNewUserPage} name="newAdminUser" />
          <Route path="/admin/users/{id}/edit" page={AdminUserEditUserPage} name="editAdminUser" />
          <Route path="/admin/users/{id}" page={AdminUserUserPage} name="adminUser" />
          <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />
          <Route path="/admin/categories/new" page={AdminCategoryNewCategoryPage} name="newAdminCategory" />
          <Route path="/admin/categories/{id}/edit" page={AdminCategoryEditCategoryPage} name="editAdminCategory" />
          <Route path="/admin/categories/{id}" page={AdminCategoryCategoryPage} name="adminCategory" />
          <Route path="/admin/categories" page={AdminCategoryCategoriesPage} name="adminCategories" />
        </Set>
      </Private>
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Private unauthenticated="login">
        <Set wrap={DefaultLayout}>
          <Route path="/profile" page={ProfilePage} name="profile" />
          <Route path="/settings" page={SettingsPage} name="settings" />
          <Route path="/projects/new" page={ProjectNewProjectPage} name="newProject" />
          <Route path="/projects/{id}/edit" page={ProjectEditProjectPage} name="editProject" />
          <Route path="/projects/{id}" page={ProjectProjectPage} name="project" />
          <Route path="/my-projects" page={ProjectMyProjectsPage} name="myProjects" />
          <Route path="/project-templates" page={ProjectProjectTemplatesPage} name="projectTemplates" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
