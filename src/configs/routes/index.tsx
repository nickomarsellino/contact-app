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
  {
    id: 1,
    path: "/contact/edit/:id",
    // component: ContactForm,
    exact: true,
    component: (p: any) => {
      const pageProps = {
        type: 'edit',
      };
      const props = { ...p, pageProps };
      return <ContactForm {...props} />;
    },
  },
];

export default AppRoutes;
