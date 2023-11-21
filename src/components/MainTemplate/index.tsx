interface MainTemplateProps {
  children?: any;
}

const MainTemplate = ({ children = Node }: MainTemplateProps) => {
  return (
    <div className="contect-apps">
      <div className="container">{children}</div>
    </div>
  );
};

export default MainTemplate;
