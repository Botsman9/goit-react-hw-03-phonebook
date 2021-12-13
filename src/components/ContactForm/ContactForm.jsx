import { Component } from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  contactChek = () => {
    const { name, number } = this.state;
    const { contacts } = this.props;
    const namesIsIn = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      []
    );
    const numbersIsIn = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      []
    );

    if (namesIsIn.includes(name) || numbersIsIn.includes(number)) {
      alert(`${name}${number} is already in contacts`);
      return;
    }

    if (name === "" || number === "") {
      alert("Enter all data, please");
      return;
    }

    this.props.onSubmit(name, number);
  };

  handleSubmit = (e) => {
    // const { name, number } = this.state;

    e.preventDefault();
    this.setState({ name: "", number: "" });
    if (this.contactChek()) {
      return;
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.label}>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Anie Copeland"
            onChange={this.handleChange}
            className={s.input}
          />
        </label>

        <label className={s.label}>
          Number:
          <input
            type="tel"
            name="number"
            value={this.state.number}
            placeholder="227-91-26"
            onChange={this.handleChange}
            className={s.input}
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactForm;
