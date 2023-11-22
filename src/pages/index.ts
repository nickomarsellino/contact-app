import { lazy } from "react";

const ContactList = lazy(() => import("./ContactList"));
const ContactForm = lazy(() => import("./ContactForm"));

export { ContactList, ContactForm };
