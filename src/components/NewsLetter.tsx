import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type NewsletterFormData = z.infer<typeof newsletterSchema>;
const NewsletterSubscription: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });
  const onSubmit = (data: NewsletterFormData) => {
    console.log("Subscribing with email:", data.email);
    reset();
  };

  return (
    <div className=" bg-gray-100 p-8  h-[170px] rounded-lg max-w-auto mx-[30px] mb-10">
      <p className="text-xl font-semibold text-gray-500 mb-2">Restez informé</p>
      <div className="flex items-center gap-10">
        <div>
          <h2 className="text-xl font-bold mb-4">
            <span className="text-red-500">Abonnez-vous</span> à notre
            newsletter pour recevoir les dernières actualités <br /> du
            Ministère de la Jeunesse, de la Culture et de la Communication.
          </h2>
        </div>
        <div className="flex-1 ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <div className="flex-grow relative">
              <input
                {...register("email")}
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.email && (
                <p className="absolute mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
