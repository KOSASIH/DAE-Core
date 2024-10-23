# zk_proof_generator.py

import os
from Crypto.Hash import SHA256

class ZKProofGenerator:
    def __init__(self, secret):
        self.secret = secret
        self.commitment = self.commit()

    def commit(self):
        """Create a commitment to the secret."""
        r = os.urandom(16)  # Random nonce
        commitment = SHA256.new(self.secret.encode() + r).hexdigest()
        return commitment, r

    def generate_proof(self):
        """Generate a zero-knowledge proof."""
        commitment, r = self.commitment
        proof = {
            'commitment': commitment,
            'random_nonce': r.hex()
        }
        return proof

if __name__ == "__main__":
    secret = input("Enter your secret: ")
    zk_proof_gen = ZKProofGenerator(secret)
    proof = zk_proof_gen.generate_proof()
    print("Zero-Knowledge Proof Generated:")
    print(proof)
