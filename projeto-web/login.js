// backend.js (exemplo Node.js)
const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const bodyParser = require('body-parser');

const CLIENT_ID = '730279010559-urgsk8f31b8ou691sn81k00coaaq4iek.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(bodyParser.json());

app.post('730279010559-urgsk8f31b8ou691sn81k00coaaq4iek.apps.googleusercontent.com', async (req, res) => {
  const token = req.body.token;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    // Aqui você tem as infos do usuário Google, ex:
    const userid = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];

    // Agora você pode criar sessão, salvar no banco, etc.
    // Exemplo simples só pra retornar sucesso:
    res.json({ success: true, userid, email, name });

  } catch (error) {
    res.status(401).json({ success: false, message: 'Token inválido' });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
