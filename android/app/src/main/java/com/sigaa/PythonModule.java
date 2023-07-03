package com.sigaa;

import android.content.Context;

import androidx.annotation.NonNull;

import com.chaquo.python.PyObject;
import com.chaquo.python.Python;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PythonModule extends ReactContextBaseJavaModule {
    Context context;
    String TAG = "Python Running";
    Python py = Python.getInstance();
    PyObject pyobj = py.getModule("app");
    Thread thread;

    PythonModule(ReactApplicationContext context) {
        super(context);
        this.context = context.getApplicationContext();
    }

    @NonNull
    @Override
    public String getName() {
        return "PythonModule";
    }

    @ReactMethod
    public void post(String url, String json, Promise promise) {
        thread = new Thread(() -> {
            PyObject obj = pyobj.callAttr("post", url, json);
            String result = obj.toString();
            try {
                promise.resolve(result);
            } catch (Exception e) {
                promise.reject("Error ", e);
            }
        });
        thread.start();
    }

    @ReactMethod
    public void download(String url, String json, Promise promise) {
        thread = new Thread(() -> {
            PyObject obj = pyobj.callAttr("download", url, json);
            String result = obj.toString();
            try {
                promise.resolve(result);
            } catch (Exception e) {
                promise.reject("Error ", e);
            }
        });
        thread.start();
    }

    @ReactMethod
    public void get(String url, Promise promise) {
        thread = new Thread(() -> {
            PyObject obj = pyobj.callAttr("get", url);
            String result = obj.toString();
            try {
                promise.resolve(result);
            } catch (Exception e) {
                promise.reject("Error ", e);
            }
        });
        thread.start();
    }

    @ReactMethod
    public void cancel(){
        new Thread(() -> {
            thread.interrupt();
        });
    }
}
