const CREDENTIAL_KEY = 'soramula-passkey-credential-id';
const USER_ID_KEY = 'soramula-passkey-user-id';

const toBase64Url = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const fromBase64Url = (value: string) => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

const randomChallenge = () => crypto.getRandomValues(new Uint8Array(32));

export const isWebAuthnAvailable = () =>
  typeof window !== 'undefined' &&
  window.isSecureContext &&
  'PublicKeyCredential' in window &&
  !!navigator.credentials;

export const hasRegisteredPasskey = () => !!localStorage.getItem(CREDENTIAL_KEY);

export async function registerPasskey(name = 'Siswa Soramula') {
  if (!isWebAuthnAvailable()) {
    throw new Error('Fingerprint/Passkey hanya tersedia di HTTPS atau localhost.');
  }

  const userId = crypto.getRandomValues(new Uint8Array(16));
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: randomChallenge(),
      rp: { name: 'Soramula' },
      user: {
        id: userId,
        name,
        displayName: name,
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 },
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
      timeout: 60000,
      attestation: 'none',
    },
  });

  if (!credential || !('rawId' in credential)) {
    throw new Error('Pendaftaran fingerprint/passkey dibatalkan.');
  }

  localStorage.setItem(CREDENTIAL_KEY, toBase64Url(credential.rawId));
  localStorage.setItem(USER_ID_KEY, toBase64Url(userId.buffer));
  return credential.id;
}

export async function authenticatePasskey() {
  if (!isWebAuthnAvailable()) {
    throw new Error('Fingerprint/Passkey hanya tersedia di HTTPS atau localhost.');
  }

  const credentialId = localStorage.getItem(CREDENTIAL_KEY);
  if (!credentialId) {
    throw new Error('Fingerprint belum didaftarkan di perangkat ini.');
  }

  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: randomChallenge(),
      allowCredentials: [
        {
          id: fromBase64Url(credentialId),
          type: 'public-key',
          transports: ['internal'],
        },
      ],
      userVerification: 'required',
      timeout: 60000,
    },
  });

  if (!assertion) {
    throw new Error('Verifikasi fingerprint/passkey dibatalkan.');
  }

  return assertion.id;
}

export function clearRegisteredPasskey() {
  localStorage.removeItem(CREDENTIAL_KEY);
  localStorage.removeItem(USER_ID_KEY);
}
