import { HttpErrorResponse } from '@angular/common/http';

export type ApiError = {
    status: number;
    message: string | null;
    raw: unknown;
};

function isHttpErrorResponse(err: unknown): err is HttpErrorResponse {
    return err instanceof HttpErrorResponse;
}

function extractMessage(payload: unknown): string | null {
    if (!payload || typeof payload !== 'object') {
        return null;
    }

    const anyPayload = payload as { message?: unknown; error?: unknown };

    if (typeof anyPayload.message === 'string') {
        return anyPayload.message;
    }

    if (typeof anyPayload.error === 'string') {
        return anyPayload.error;
    }

    return null;
}

export function mapApiError(err: unknown): ApiError {
    if (!isHttpErrorResponse(err)) {
        return {
            status: 0,
            message: 'Error inesperado.',
            raw: err,
        };
    }

    const message =
        extractMessage(err.error) ??
        (typeof err.message === 'string' ? err.message : null);

    return {
        status: err.status ?? 0,
        message,
        raw: err,
    };
}
