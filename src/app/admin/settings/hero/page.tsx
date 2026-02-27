"use client";

import { PageHeader } from "@/components/admin/PageHeader";

export default function HeroSettingsPage() {
    return (
        <div>
            <PageHeader
                title="Hero Section Configuration"
                description="Update the main headline, subtitle, and call-to-action buttons on the home page."
            />

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <form className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="col-span-full">
                            <label htmlFor="hero-headline" className="block text-sm font-medium leading-6 text-gray-900">
                                Main Headline
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="hero-headline"
                                    id="hero-headline"
                                    defaultValue="Transforming Ideas into Digital Reality"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6 text-lg font-medium"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">The primary large text displayed at the top of the page.</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="hero-subtitle" className="block text-sm font-medium leading-6 text-gray-900">
                                Subtitle / Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="hero-subtitle"
                                    name="hero-subtitle"
                                    rows={3}
                                    defaultValue="We build scalable, high-performance web applications tailored to your business needs."
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Primary CTA Button Text
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    defaultValue="Start a Project"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Primary CTA Link
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    defaultValue="#contact"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6 font-mono"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Secondary CTA Button Text
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    defaultValue="View Our Work"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Secondary CTA Link
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    defaultValue="#portfolio"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-navy sm:text-sm sm:leading-6 font-mono"
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
                            Save Hero Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
