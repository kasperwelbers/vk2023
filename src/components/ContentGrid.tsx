import type { OstDocument } from "outstatic";
import Link from "next/link";

type Item = {
  tags?: { value: string; label: string }[];
  url?: string;
} & OstDocument;

type Props = {
  collection: "posts" | "projects" | "media";
  title?: string;
  items: Item[];
  priority?: boolean;
};

const ContentGrid = ({ items, collection }: Props) => {
  return (
    <section id={collection}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6 lg:gap-y-8 mb-8">
        {items.map((item, id) => (
          <Link key={item.slug} href={item.url ? item.url : `/${collection}/${item.slug}`}>
            <div className="cursor-pointer border project-card rounded-md md:w-full scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 hover:shadow overflow-hidden">
              <div className="sm:mx-0">
                {collection === "media" && (
                  <h2 className="p-2 bg-opacity-80 bg-white text-center whitespace-nowrap font-bold text-l absolute top left-1/2 -translate-x-1/2 shadow-lg rounded-lg">
                    {item.title}
                    <br />
                    {item.author == null ? null : (
                      <>
                        <br />
                        <i>{item.author.name}</i>
                      </>
                    )}
                  </h2>
                )}
                <img
                  src={item.coverImage ?? ""}
                  alt={`Cover Image for ${item.title}`}
                  className="object-cover object-center w-full h-auto"
                  width={0}
                  height={0}
                  sizes="(min-width: 768px) 347px, 192px"
                />
                {collection === "projects" && (
                  <h2 className="p-2 bg-opacity-80 bg-white text-center whitespace-nowrap font-bold text-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg rounded-lg">
                    {item.title}
                  </h2>
                )}
              </div>
              {collection === "posts" && (
                <div className="p-4">
                  {Array.isArray(item?.tags)
                    ? item.tags.map(({ label }) => (
                        <span
                          key={label}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {label}
                        </span>
                      ))
                    : null}
                  <h3 className="text-xl mb-2 leading-snug font-bold hover:underline">{item.title}</h3>
                  <div className="text-md mb-4 text-slate-700"></div>
                  <p className="text-lg leading-relaxed mb-4">{item.description}</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;
