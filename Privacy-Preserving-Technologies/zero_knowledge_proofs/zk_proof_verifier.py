# zk_proof_verifier.py

from Crypto.Hash import SHA256

class ZKProofVerifier:
    def __init__(self, secret, proof):
        self.secret = secret
        self.proof = proof

    def verify(self):
        """Verify the zero-knowledge proof."""
        commitment = self.proof['commitment']
        r = bytes.fromhex(self.proof['random_nonce'])
        computed_commitment = SHA256.new(self.secret.encode() + r).hexdigest()
        return computed_commitment == commitment

if __name__ == "__main__":
    secret = input("Enter your secret for verification: ")
    proof = {
        'commitment': input("Enter the commitment: "),
        'random_nonce': input("Enter the random nonce: ")
    }
    zk_proof_verifier = ZKProofVerifier(secret, proof)
    if zk_proof_verifier.verify():
        print("Proof is valid!")
    else:
        print("Proof is invalid!")
