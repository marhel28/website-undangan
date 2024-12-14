type TMetaData = { title: string; desc: string; imgUrl: string; linkUrl: string };
export default async function MetaData({ title, desc, imgUrl, linkUrl }: TMetaData) {
  try {
    return {
      title: `${title} `,
      description: desc,
      openGraph: {
        title: title,
        description: desc,
        url: linkUrl,
        siteName: process.env.NEXT_PUBLIC_NAME_APP,
        images: [
          {
            url: imgUrl,
            width: 800,
            height: 600,
            alt: process.env.NEXT_PUBLIC_NAME_APP,
          },
          {
            url: imgUrl,
            width: 1800,
            height: 1600,
            alt: process.env.NEXT_PUBLIC_NAME_APP,
          },
        ],
        locale: 'en',
        type: 'website',
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${linkUrl}`,
        languages: {
          en: `${process.env.NEXT_PUBLIC_BASE_URL}${linkUrl}`,
        },
      },
    };
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    };
  }
}
