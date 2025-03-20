import Text from '../Text/Text'

const Tab = ({style, ...props}) => {
  return <Text
    paddingHorizontal={10}
    fontSize='heading'
    color='white'
    style={style}
    {...props} />;
};

export default Tab;
