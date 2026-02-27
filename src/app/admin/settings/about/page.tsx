"use client";

import { PageHeader } from "@/components/admin/PageHeader";

export default function AboutSettingsPage() {
    return (
        <div>
            <PageHeader
                title="About Section Content"
                description="Update the 'Who We Are' section on the homepage."
            />

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <form className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="col-span-full">
                            <label htmlFor="about-heading" className="block text-sm font-medium leading-6 text-gray-900">
                                Heading Text
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="about-heading"
                                    id="about-heading"
                                    defaultValue="Who We Are"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6 font-medium"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about-content" className="block text-sm font-medium leading-6 text-gray-900">
                                Main Content / Paragraph
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about-content"
                                    name="about-content"
                                    rows={6}
                                    defaultValue="TGT is a premier digital agency focused on delivering high-impact solutions for forward-thinking brands. We believe in the power of technology to transform businesses and create meaningful connections with audiences."
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Featured Image URL
                            </label>
                            <div className="mt-2">
                                <input
                                    type="url"
                                    defaultValue="/images/about-team.jpg"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6 font-mono"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Provide a link to the image to display alongside the text.</p>
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
                            Save About Content
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
