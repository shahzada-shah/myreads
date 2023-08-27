import { Link } from "react-router-dom";
import { BookOpenIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { BsFillFilterSquareFill } from "react-icons/bs";

const features = [
  {
    name: "Organize Your Library",
    description:
      'Easily sort your books into categories like "Read", "Currently Reading", and "Want to Read" with a few simple clicks.',
    href: "/library",
    icon: BookOpenIcon,
  },
  {
    name: "Social Features",
    description:
      "Connect with friends and fellow book lovers. Share your favorite books and get recommendations.",
    href: "/library",
    icon: UserGroupIcon,
  },
  {
    name: "Advanced Filters",
    description:
      "Find your next book with our advanced filtering options. Sort by genre, author, ratings, and more.",
    href: "/browse-catalog",
    icon: BsFillFilterSquareFill,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Your Personal Library
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for Your Reading Life
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Manage, discover, and share books like never before.
          </p>
          <p className="mt-1 text-lg leading-8 text-gray-600">
            Simplify your reading life with MyReads.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      to={feature.href}
                      className="text-sm font-semibold leading-6 text-blue-600"
                    >
                      Dive In <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
