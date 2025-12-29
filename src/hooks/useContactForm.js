import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export const useContactForm = () => {
    const formRef = useRef();
    const [status, setStatus] = useState("idle"); 

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus("loading");

        const SERVICE_ID = "service_getxzqk"; 
        const TEMPLATE_ID = "template_9jz4313"; 
        const PUBLIC_KEY = "-VED3o7CxunngaC5E";  


        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then(() => {
                setStatus("success");
                formRef.current.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                setStatus("error");
            });
    };

    const resetStatus = () => setStatus("idle");

    return { formRef, status, sendEmail, resetStatus };
};