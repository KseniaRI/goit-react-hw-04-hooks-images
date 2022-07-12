import { TextMessage } from './Message.styled';
import PropTypes from 'prop-types';

export const Message = ({ text }) => <TextMessage>{text}</TextMessage>;

Message.propTypes = {
    text: PropTypes.string.isRequired,
}