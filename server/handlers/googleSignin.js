const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "972191320332-v7cc469r7trk8s1f9ll159tc8r9jq17k.apps.googleusercontent.com"
);

const googleSignin = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "972191320332-v7cc469r7trk8s1f9ll159tc8r9jq17k.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload(); // Get user's id, name and email from the token
    const userId = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];

    res.status(200).json({ userId, email, name });
  } catch (error) {
    console.error("Error verifying Google ID token", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = googleSignin;
