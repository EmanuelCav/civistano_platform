package helper

import (
	"crypto/rand"
	"math/big"
)

func GenerateRandomCode() int {

	min := int64(100000)
	max := int64(999999)

	code, err := rand.Int(rand.Reader, big.NewInt(max-min+1))

	if err != nil {
		panic(err)
	}

	return int(code.Int64() + min)

}
