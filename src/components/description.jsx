import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

const Description = ({ part_of_speech, body }) => (
  <Card>
    <Card.Title title={part_of_speech} />
    <Card.Content>
      <Paragraph style={styles.container}>
        { body }
      </Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  }
});

Description.propTypes = {

};

export default Description;
