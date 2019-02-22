import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {newLocation: '',};
    }

    handleChangeText = (typedLocation) => {
        // this.props, referenced here, is actually owned by the App and not the child component, SearchInput
        this.setState({newLocation: typedLocation});
    };

    handleSubmitEditing = () => {
        const {onSubmit} = this.props;
        const {newLocation} = this.state;
        if (!newLocation) return;
        onSubmit(newLocation); // This closure is being passed by the parent, App
        this.setState({newLocation: ''});
    };



    render() {

        const {placeholder} = this.props;
        const {newLocation} = this.state;

        return(
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    value={newLocation}
                    placeholder={placeholder}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    clearButtonMode="always"
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}
                ></TextInput>
            </View>

        );
    }
}

SearchInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#666',
      color: 'white',
      height: 40,
      width: 300,
      marginTop: 20,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      alignSelf: 'center',
      borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white',
    }
  });