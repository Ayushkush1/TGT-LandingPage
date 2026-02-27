"use client";

import { PageHeader } from "@/components/admin/PageHeader";

export default function GeneralSettingsPage() {
    return (
        <div>
            <PageHeader
                title="General Settings"
                description="Manage your site's core information and contact details."
            />

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <form className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="site-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Site Name / Logo Text
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="site-name"
                                    id="site-name"
                                    defaultValue="TGT"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="contact-email" className="block text-sm font-medium leading-6 text-gray-900">
                                Contact Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="contact-email"
                                    name="contact-email"
                                    type="email"
                                    defaultValue="hello@tgt.com"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="contact-phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Contact Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="contact-phone"
                                    id="contact-phone"
                                    defaultValue="+1 (555) 123-4567"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Physical Address
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    defaultValue="123 Innovation Drive&#10;Tech City, TC 10101"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="footer-copyright" className="block text-sm font-medium leading-6 text-gray-900">
                                Footer Copyright Text
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="footer-copyright"
                                    id="footer-copyright"
                                    defaultValue="© 2026 TGT. All rights reserved."
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy transition-colors"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
