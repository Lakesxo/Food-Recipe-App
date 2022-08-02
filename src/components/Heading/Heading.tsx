import "./Heading.scss";

interface HeadingProps {
  title: string;
}

const Heading: React.FunctionComponent<HeadingProps> = ({ title }) => {
  return <h2 className="heading">{title}</h2>;
};

export default Heading;
