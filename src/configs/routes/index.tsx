import { ContactList, ContactForm } from "../../pages";

const AppRoutes = [
  {
    id: 0,
    path: "/",
    component: ContactList,
    exact: true,
  },
  {
    id: 1,
    path: "/contact/add",
    component: ContactForm,
    exact: true,
  },
];

export default AppRoutes;
