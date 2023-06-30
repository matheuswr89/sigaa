package com.sigaa;

import android.content.Context;

import androidx.annotation.NonNull;

import com.chaquo.python.PyObject;
import com.chaquo.python.Python;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.List;

public class PythonModule extends ReactContextBaseJavaModule {
    Context context;
    String TAG = "Python Running";
    Python py = Python.getInstance();
    PyObject pyobj = py.getModule("app");

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
        PyObject obj = pyobj.callAttr("post", url, json);
        String result = obj.toString();
        try {
            promise.resolve(result);
        } catch(Exception e) {
            promise.reject("Error ", e);
        }
    }

    @ReactMethod
    public void download(String url, String json, Promise promise) {
        PyObject obj = pyobj.callAttr("download", url, json);
        String result = obj.toString();
         try {
            promise.resolve(result);
        } catch(Exception e) {
            promise.reject("Error ", e);
        }
    }

    @ReactMethod
    public void get(String url, Promise promise) {
        PyObject obj = pyobj.callAttr("get", url);
        String result = obj.toString();
        try {
            promise.resolve(result);
        } catch(Exception e) {
            promise.reject("Error ", e);
        }
    }
}
