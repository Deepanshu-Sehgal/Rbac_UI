# **RBAC Admin Dashboard**

An **Admin Dashboard** application for managing **Users**, **Roles**, and **Permissions** using React and Redux. This dashboard allows administrators to:

1. Add, edit, and delete users.
2. Assign roles to users and manage their statuses (Active/Inactive).
3. Define roles with customizable permissions.
4. Manage and view permissions dynamically.

---

## **Features**

### **1. User Management**
- Add, edit, and delete users.
- Assign roles to users.
- Display a list of users along with their roles and permissions.
- **Manage user status**: Toggle between Active and Inactive status for each user.

### **2. Role Management**
- Add, edit, and delete roles.
- Assign permissions to roles dynamically.
- Display a list of roles with their associated permissions.

### **3. Permissions Management**
- View and manage all available permissions.
- Assign permissions to roles.

### **4. Quick Actions**
- Quick access buttons for managing users, roles, and permissions.

---

## **How to Use**

### **1. Manage Users**
- Navigate to `/users` to:
  - Add new users.
  - Edit existing users.
  - Assign roles to users.
  - Toggle user status (Active/Inactive).
  - Delete users.

### **2. Manage Roles**
- Navigate to `/roles` to:
  - Add new roles with permissions.
  - Edit existing roles.
  - Delete roles.

### **3. View Permissions**
- Navigate to `/permissions` to view all available permissions.

---

## **How to Toggle User Status**
1. Go to the **Manage Users** page.
2. Find the user whose status you want to change.
3. Click the button under the **Status** column:
   - Green for "Active."
   - Red for "Inactive."
4. The user's status will toggle between "Active" and "Inactive."

---

## **Technologies Used**
- **Frontend**: React, React Router, Tailwind CSS
- **State Management**: Redux Toolkit
- **Tooling**: ESLint, Prettier
