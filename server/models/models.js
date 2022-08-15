const pool = require('../../db/index.js');
const format = require('pg-format');

module.exports.readUser = (username, password) => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          SELECT
            id, username, avatar
          FROM users
          WHERE username = $1 AND password = $2
        `, [username, password])
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log('Problem reading user: ', err);
          client.release();
          return err;
        });
      })
      .catch((err) => {
        console.log('Error connecting to pool: ', err);
        return err;
      })
  );
};

module.exports.addUser = (username, password, avatar) => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          INSERT INTO users (username, password, avatar)
          VALUES ($1, $2, $3)
          RETURNING id
        `, [username, password, avatar])
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log('Problem adding user: ', err);
          client.release();
          return err;
        });
      })
      .catch((err) => {
        console.log('Error connecting to pool: ', err);
        return err;
      })
  );
};

module.exports.putUser = (userId, username, password, avatar) => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          UPDATE users
            SET
              username = $1,
              password = $2,
              avatar = $3
          WHERE id = $4
        `, [username, password, avatar, userId])
        .then(() => {
          client.release();
          return;
        })
        .catch((err) => {
          console.log('Problem updating user: ', err);
          client.release();
          return err;
        });
      })
      .catch((err) => {
        console.log('Error connecting to pool: ', err);
        return err;
      })
  );
};

module.exports.readUserCards = (userId) => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          SELECT
            body
          FROM answers
          WHERE user_id = $1
        `, [userId])
        .then((result) => {
          client.release();
          console.log(result);
          return result;
        })
        .catch((err) => {
          console.log('Problem reading user: ', err);
          client.release();
          return err;
        });
      })
      .catch((err) => {
        console.log('Error connecting to pool: ', err);
        return err;
      })

  );
};

module.exports.putUserCards = (userId, cards) => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          DELETE FROM
            answers
          WHERE
            user_id = $1
        `, [userId])
        .then(() => {
          return client.query(format(`
            INSERT INTO
              answers (body, user_id)
            VALUES
              %L
          `, cards), []);
        })
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log('Problem reading user: ', err);
          client.release();
          return err;
        });
      })
      .catch((err) => {
        console.log('Error connecting to pool: ', err);
        return err;
      })
  );
};

module.exports.readPromptCards = () => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          SELECT
            body
          FROM
            prompts;
        `)
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log('Problem reading prompt: ', err);
          client.release();
          return err;
        });
      })
      .catch((err) => {
        console.log('Error connecting to pool: ', err);
        return err;
      })
  );
};

module.exports.readAnswerCards = () => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          SELECT
            body
          FROM
            answers
          WHERE
            user_id IS NULL
        `)
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log('Problem reading user: ', err);
          client.release();
          return err;
        });
      })
      .catch((err) => {
        console.log('Error connecting to pool: ', err);
        return err;
      })
  );
}