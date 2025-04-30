
interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>;
};

export default PageTitle;
