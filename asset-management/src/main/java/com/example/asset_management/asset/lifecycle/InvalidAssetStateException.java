package com.example.asset_management.asset.lifecycle;

public class InvalidAssetStateException extends RuntimeException {

    public InvalidAssetStateException(String message) {
        super(message);
    }

}