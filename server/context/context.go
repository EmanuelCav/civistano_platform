package context

import (
	"context"
	"time"
)

func Context() (context.Context, context.CancelFunc) {

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)

	return ctx, cancel

}
