import Text from './Text';

const H2 = ({ style, ...props }) => {
  return <Text fontSize="heading" style={style} {...props} />;
};

export default H2;
