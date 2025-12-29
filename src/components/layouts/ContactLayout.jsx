import React from "react";
import { Mail, Phone, CheckCircle, Loader2, Send } from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm"; 

const ContactLayout = () => {
    const { formRef, status, sendEmail, resetStatus } = useContactForm();

    return (
        <div className="flex flex-col gap-6 h-full pb-2">
            {/* Header */}
            <div className="bg-blue-600 w-full rounded-2xl p-8 text-white shadow-lg relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                    <div className="max-w-sm">
                        <h2 className="text-3xl font-bold mb-3">Get in Touch</h2>
                        <p className="text-blue-100 font-medium">"I'm always open to discussing product design work or partnership opportunities."</p>
                    </div>
                    <div className="flex flex-col gap-4 bg-white/10 p-5 rounded-xl backdrop-blur-md border border-white/20 min-w-[280px]">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-white text-blue-600 rounded-lg shrink-0"><Mail size={20} /></div>
                            <div className="min-w-0">
                                <p className="text-xs text-blue-200 font-bold uppercase mb-0.5">Email</p>
                                <p className="font-semibold text-white text-sm break-all">utsavdodiya.svmr@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-white text-blue-600 rounded-lg shrink-0"><Phone size={20} /></div>
                            <div>
                                <p className="text-xs text-blue-200 font-bold uppercase mb-0.5">Phone</p>
                                <p className="font-semibold text-white text-sm">+91 9998-317-523</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                {status === "success" ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><CheckCircle size={40} /></div>
                        <h3 className="text-2xl font-bold text-gray-800">Message Sent!</h3>
                        <p className="text-gray-500 mt-2">Thanks for reaching out. I'll get back to you shortly.</p>
                        <button onClick={resetStatus} className="mt-8 px-6 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-colors">Send another</button>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-5 h-full flex flex-col justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5"><label className="text-sm font-bold text-gray-700 ml-1">Name</label><input required name="user_name" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" /></div>
                            <div className="space-y-1.5"><label className="text-sm font-bold text-gray-700 ml-1">Email</label><input required name="user_email" type="email" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" /></div>
                        </div>
                        <div className="space-y-1.5"><label className="text-sm font-bold text-gray-700 ml-1">Message</label><textarea required name="message" rows={4} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all" placeholder="How can I help you?"></textarea></div>
                        <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] disabled:opacity-70 disabled:active:scale-100">
                            {status === "loading" ? <Loader2 className="animate-spin" /> : <Send size={20} />} {status === "loading" ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactLayout;