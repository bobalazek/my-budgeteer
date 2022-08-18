import { Router, Route, Private, Set } from '@redwoodjs/router'

import AdminLayout from './layouts/AdminLayout/AdminLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="login" roles={['admin']}>
        <Set wrap={AdminLayout}>
          <Route path="/admin" page={AdminPage} name="admin" />
          <Route path="/admin/users/new" page={AdminUserNewUserPage} name="newUser" />
          <Route path="/admin/users/{id}/edit" page={AdminUserEditUserPage} name="editUser" />
          <Route path="/admin/users/{id}" page={AdminUserUserPage} name="user" />
          <Route path="/admin/users" page={AdminUserUsersPage} name="users" />
          <Route path="/admin/categories/new" page={AdminCategoryNewCategoryPage} name="newCategory" />
          <Route path="/admin/categories/{id}/edit" page={AdminCategoryEditCategoryPage} name="editCategory" />
          <Route path="/admin/categories/{id}" page={AdminCategoryCategoryPage} name="category" />
          <Route path="/admin/categories" page={AdminCategoryCategoriesPage} name="categories" />
        </Set>
      </Private>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/projects/new" page={ProjectNewProjectPage} name="newProject" />
      <Route path="/projects/{id}/edit" page={ProjectEditProjectPage} name="editProject" />
      <Route path="/projects/{id}" page={ProjectProjectPage} name="project" />
      <Route path="/projects" page={ProjectProjectsPage} name="projects" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
