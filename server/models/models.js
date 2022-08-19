const pool = require("../../db/index.js");
const format = require("pg-format");

module.exports.readUser = (username) => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          `
          SELECT
            id, username, password, avatar
          FROM users
          WHERE username = $1
        `,
          [username]
        )
        .then((result) => {
          client.release();
          return result.rows[0];
        })
        .catch((err) => {
          console.log("Problem reading user: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    });
};

module.exports.readUsername = (username) => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          `
          SELECT
            id
          FROM users
          WHERE username = $1
        `,
          [username]
        )
        .then((result) => {
          client.release();
          return result.rows[0];
        })
        .catch((err) => {
          console.log("Problem reading username: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    });
};

module.exports.addUser = (username, password, avatar) => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          `
          INSERT INTO users (username, password, avatar)
          VALUES ($1, $2, $3)
          RETURNING id, username, password, avatar
        `,
          [username, password, avatar]
        )
        .then((result) => {
          client.release();
          return result.rows[0];
        })
        .catch((err) => {
          console.log("Problem adding user: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    });
};

module.exports.putUser = (userId, username, password, avatar) => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          `
          UPDATE users
            SET
              username = $1,
              password = $2,
              avatar = $3
          WHERE id = $4
        `,
          [username, password, avatar, userId]
        )
        .then(() => {
          client.release();
          return;
        })
        .catch((err) => {
          console.log("Problem updating user: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    });
};

module.exports.readUserCards = (userId, NSFW) => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          `
          SELECT
            body
          FROM
            answers
          WHERE
            user_id = $1 AND NSFW = $2
        `,
          [userId, NSFW]
        )
        .then((result) => {
          client.release();
          console.log(result);
          return result;
        })
        .catch((err) => {
          console.log("Problem reading user: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    });
};

module.exports.putUserAnswerCards = (userId, cards) => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          DELETE FROM
            answers
          WHERE
            user_id = $1
        `,
          [userId]
        )
        .then(() => {
          return client.query(
            format(
              `
            INSERT INTO
              answers (body, user_id, NSFW)
            VALUES
              %L
          `,
              cards
            ),
            []
          );
        })
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log("Problem reading user: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    })
  );
};

module.exports.putUserPromptCards = (userId, cards) => {
  return (
    pool
      .connect()
      .then((client) => {
        return client.query(`
          DELETE FROM
            prompts
          WHERE
            user_id = $1
        `, [userId])
        .then(() => {
          return client.query(format(`
            INSERT INTO
              prompts (body, user_id, NSFW)
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

module.exports.readPromptCards = (NSFW) => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          `
          SELECT
            body
          FROM
            prompts
          WHERE
            NSFW = $1;
        `,
          [NSFW]
        )
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log("Problem reading prompt: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    });
};

module.exports.readAnswerCards = (NSFW) => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          `
          SELECT
            body
          FROM
            answers
          WHERE
            user_id IS NULL AND NSFW = $1
        `,
          [NSFW]
        )
        .then((result) => {
          client.release();
          return result;
        })
        .catch((err) => {
          console.log("Problem reading user: ", err);
          client.release();
          return err;
        });
    })
    .catch((err) => {
      console.log("Error connecting to pool: ", err);
      return err;
    });
};
